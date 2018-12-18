import cv2
import database
from homecommand import homehub
import re
import time
cap = cv2.VideoCapture(0)


db = database.init()[0]
data = db.get().val()
all_command = ['command', 'set status','check status', "bye",'change user','open the camera']
UserText = ''
UserOld = ''
RobotText = ''
initialize = 0
flag = 0

home = homehub();
command = 'you can say key words in like command, set status, check status, bye and open the camera'
class User:
    def __init__(self,name):
        self.name = name

# if (data['name']):
#     user = User(data['name'])
# else:
#     user = User(name= "Guest")

#db.update({"name":user.name})

if(__name__)=='__main__':



    def Initial(name):
        user = User(name)
        RobotText = 'Hi {},'.format(user.name) + command
        db.update({"RobotText": RobotText})
        #UserOld = user.name
        #print(UserOld)
        print("Initialized")

    def TaskProcess(task,response,stage):
        RobotText,completed = home.response_list((task,response,stage))
        #print("RobotText", RobotText)
        db.update({"RobotText": RobotText})
        if(completed):

            time.sleep(0.5)
            db.update({"RobotText":command})
            home.completed=False
            return 0






    while True:
        data = db.get().val()
        if(data['UserText']!='Null' and initialize ==0):
            Initial(data['UserText'])
            initialize = 1
            UserOld = data['UserText']



        while (initialize == 1):

            data = db.get().val()
            # print("UserOld",UserOld)
            # print("UserText",data['UserText'])
            if(UserOld != data['UserText']):

                #UserText = data['UserText']

                if (data['UserText'] == 'bye'):
                    db.update({'UserText': "Null"})
                    db.update({'RobotText': "Bye"})
                    time.sleep(1)
                    initialize=0
                    db.update({'RobotText': "What is your name?"})
                    break

                if(data['UserText'] in all_command and flag == 0):
                    flag = 1
                    stage = 0
                    if(data['UserText']=='bye'):
                        break
                    task = data['UserText']
                    TaskProcess(task,data['UserText'],stage)
                    UserOld = data['UserText']
                    break
                if (flag == 1):
                    stage = stage + 1
                    flag = TaskProcess(task, data['UserText'], stage)

                    UserOld = data['UserText']
                    break
                    # print("RobotText", RobotText)
                    # db.update({"RobotText": RobotText})




                UserOld = data['UserText']

                print("data updated")

############################################################


        #
        # if(userText==''):
        #     # = data['say']
        #     user.name = userText
        # user_command = 'Hi {},you can say key words in like command, set status, check status, bye,change user and open the camera'.format(userText)#, all_command)  # ,'or add your new roles.\n Or check and update status.\n Say Bye to break the loop\n')    #input user's request
        #     #user_command = re.sub(r"[]",'',user_command)
        #
        # #else:
        #     user_input = data['say']
        #     #print(data['say'])
        #     res = home.response_list(user_input)
        #
        # db.update({"RobotSpeak": user_command})
        # if user_command == 'Bye':
        #     print('Bye')
        #     user=User(name="Guest")
        #     #break  # Break the loop if user inputs 'Bye'
        # if user_command == 'change user':
        #     user_name = input('What is your name: \n')  # input user's name
        #     user_command = input('Hi {}, nice to meet you. You can say key words in{}'.format(user_name, all_command))


        time.sleep(0.5)
        #homehub.response_list(user_command)
        #print('\nStart another Conversation.')
