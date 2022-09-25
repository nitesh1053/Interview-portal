def participantSerializer(participant):
    return {
        'name': participant.name,
        'mail': participant.mail,
        'id': participant.id
    }

def interviewSerializer(interview):
    return {
        'name': interview.name,
        'id': interview.id,
        'participants': [participantSerializer(participant) for participant in interview.participants.all()],
        'start_time': interview.start_time,
        # .strftime("%Y-%m-%d %H:%M:%S")
        'end_time': interview.end_time,
    }

