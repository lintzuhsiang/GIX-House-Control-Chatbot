#from assignment_1.face import camera
import cv2


class homehub(object):
    completed = False

    def response_list(self,command):
        # switcher = {
        #     'switch':'S',
        #     'add new comment':self.set_status(command),
        #     'check status': self.check_status(command),
        # }#.get(command,"no this command.\n")
        # func = switcher.get(command,lambda :"no this command.\n")
        # print(func)
        print(command)
        if command[0] =='check status': return self.check_status(command[1],command[2])
        elif command[0] =='set status': return self.set_status(command[1],command[2])
        elif command[0] =='command': return self.switch()
        # elif command == 'open the camera': return self.video()
        else: return "please say the commands I support."

    def video(self):
        status = input("do you want to open the camera? Enter Y to open your camera.")
        if (status=='Y'):
            while(True):
                #camera()
                if cv2.waitKey(20) & 0xFF == ord('q'):
                    break
            cv2.destroyAllWindows()



    def check_status(self,response,stage):
            keys = list(home_control.keys())

            if(stage==0):
                print("stage=0")
                item = "Which item do you want to check? {}".format(keys)

                return (item,self.completed)

            if(stage==1):
                print("stage=1")
                item = home_control[response]
                completed = True
                #    stage = 2

                return (item,completed)
            # if item in home_control:
            #     print(home_control[item])
            # else: print("this item is not in the home control. Home_control status is:",home_control)

    def switch(self):
        rule_list = ['turn on the light', 'turn off the light', 'lock the door', 'make a coffee','check the door']
        rule = input("you can say {} or add new command.".format(rule_list))
        response = {
            'turn on the light': "ok, I will turn on the light.",
            'turn off the light': "ok, I will turn off the light.",
            'lock the door': "ok, I have locked the door for you.",
            'make a coffee': "Sure, let me do this for you."
        }
        def switcher(rule):
            if rule in rule_list:
                print(response.get(rule))
            else:
                while True:
                    new_rule = input('No this command. Do you want to create this command? Enter Y/N or q to quit')

                    if(new_rule=='Y'):
                        reply = input("What do you want me to say with this rule?")
                        rule_list.append(rule)
                        response.setdefault(rule,reply)
                        print("the rule you add is: ",rule)
                        print(" and the reply of me is: ",reply)
                        break
                    elif(new_rule=='N'):
                        print("Try again with the command I have.\n")
                        break
                    elif(new_rule=='q' or new_rule=='Q'):
                        break
                    else:pass

        switcher(rule)


    def set_status(self,response,stage):
        keys = list(home_control.keys())
        print("status",response)
        if(stage==0):
            status = "what item do you want to set. i.g(Door,open) {}.\n".format(keys)
            return status,self.completed
            #status = status.split(',')
        if(stage==1):
            response = response.split(',')
            print("response",response[0],response[1])
            if response[0] in home_control.keys():
                home_control[response[0]]=response[1]
                self.completed=True
                return (response[0],response[1]),self.completed
            else:
                self.completed = True
                return 'item not in the home control',self.completed


home_control = {
        'door': 'off',
        'light': 'off',
        'coffee machine': 'off',
    }
