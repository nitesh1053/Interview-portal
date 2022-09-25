from .models import *
from rest_framework.decorators import api_view
from .serializers import interviewSerializer, participantSerializer
from django.http import JsonResponse
import datetime

# search interview by name
@api_view(['POST'])
def search(request):
    searched = request.data.get('searched')
    final_interviews = []
    if searched:
        interviews = Interview.objects.filter(name__contains=searched)

        for interview in interviews:
            final_interviews.append(interviewSerializer(interview))

    return JsonResponse({'data': final_interviews, 'keyword': searched})

# get participants api
@api_view(['GET'])
def getParticipants(request):
    participants = Participant.objects.all()
    final_participants = []
    for participant in participants:
        final_participants.append(participantSerializer(participant))
    return JsonResponse({'data': final_participants})

# get interviews api
@api_view(['GET'])
def getInterviews(request):
    interviews = Interview.objects.all()
    final_result = []
    for interview in interviews:
        final_result.append(interviewSerializer(interview))
    return JsonResponse({'data': final_result})

# edit interview
@api_view(['POST'])
def editInterviews(request, id):
    interview = Interview.objects.get(id=id)
    name = request.data.get('name')
    participant_ids = request.data.get('participant_ids')
    
    start_time = request.data.get('start_time')
    end_time = request.data.get('end_time')
    format = "%Y-%m-%d %H:%M:%S"
    start_object = datetime.datetime.strptime(start_time, format)
    end_object = datetime.datetime.strptime(end_time, format)

    if name and participant_ids and type(participant_ids) == list and len(participant_ids) >= 2 and start_time <= end_time:
        interview.name = name
        interview.start_time = start_object
        interview.end_time = end_object
        interview.participants.clear()
        for participant_id in participant_ids:
            participant = Participant.objects.filter(id=participant_id).first()
            interviews = Interview.objects.filter(participants__name=participant_id)
            for participant_interview in interviews:
                if not (participant_interview.start_time >= end_time or participant_interview.end_time <= start_time):
                    return JsonResponse({'error': 'Participant is busy at this time'})

            if participant:
                interview.participants.add(participant)
        
        interview.save()
        return JsonResponse({'data': interviewSerializer(interview)})
    else:
        return JsonResponse({'error': 'Please provide name and participants'})

# add interview
@api_view(['POST'])
def addInterviews(request):
    name = request.data.get('name')
    participant_ids = request.data.get('participant_ids')
    start_time = request.data.get('start_time')
    end_time = request.data.get('end_time')

    if name and participant_ids:
        interview = Interview.objects.create(name=name)
        for participant_id in participant_ids:
            participant = Participant.objects.get(id=participant_id)
            interview.participants.add(participant)
        interview.start_time = start_time
        interview.end_time = end_time
        interview.save()
        return JsonResponse({'data': interviewSerializer(interview)})
    else:
        return JsonResponse({'error': 'Please provide name and participants'})

@api_view(['POST'])
def addParticipants(request):
    name = request.data.get('name')
    mail = request.data.get('mail')

    if name and mail:
        participant, created = Participant.objects.get_or_create(name=name, mail=mail)
        print(participant)
        return JsonResponse({'data': participantSerializer(participant), created: created})
    else:
        return JsonResponse({'error': 'Please provide name and participants'})

# # send emails to participants
# def send(request, id):
#     interview = Interview.objects.get(id=id)
#     if request.method == 'POST':
#         subject = request.POST['subject']
#         message = request.POST['message']
#         from_email = request.POST['from_email']
#         if subject and message and from_email:
#             try:
#                 send_mail(subject, message, from_email, [interview.participants.mail])
#             except BadHeaderError:
#                 return HttpResponse('Invalid header found.')
#             return redirect('core:search')
#         else:
#             return HttpResponse('Make sure all fields are entered and valid.')
#     else:
#         return render(request, 'core/send.html', {'interview': interview})
