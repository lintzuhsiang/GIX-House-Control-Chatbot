import pyrebase
import cv2
import face
import re
# import request
import numpy as np
#from assignment_1 import face
#from assignment_1.main_1 import homehub

from binascii import a2b_base64
from keras.models import load_model
import numpy as np
import time



def init():
    config = {
    "apiKey": "AIzaSyACycsZ3FqsUuRBpygeBXCjWMEamSH7jTY",
    "authDomain": "app3-224408.firebaseapp.com",
    "databaseURL": "https://app3-224408.firebaseio.com",
    "projectId": "app3-224408",
    "storageBucket": "app3-224408.appspot.com",
    "messagingSenderId": "729755425496"
    };

    firebase = pyrebase.initialize_app(config)

    auth = firebase.auth()
    #user = auth.sign_in_with_email_and_password("shinelin@uw.edu", "shine0125951")
    # before the 1 hour expiry:
    #user = auth.refresh(user['refreshToken'])
    #print(user['idToken'])
    db = firebase.database()
    storage = firebase.storage()
    return db,storage



if __name__ == "__main__":

    cap = cv2.VideoCapture(0)
    db,storage = init()

    face_cascade = cv2.CascadeClassifier('./data/haarcascade_frontalface_default.xml')
    me_cascade = cv2.CascadeClassifier('./data/cascade_me.xml')
    model = load_model("./model/final_model.h5")
    model.compile(loss='sparse_categorical_crossentropy', optimizer='rmsprop', metrics=['accuracy'])

    data = db.get().val()



    while (True):
            # data = db.get().val()
            # url = data['imageURL']
            # binary_data = a2b_base64(url)
            #
            # fd = open('image.png', 'wb')
            # fd.write(binary_data)
            # fd.close()
            # Capture frame-by-frame

        if (data['camera'] == 'on'):
            ret, frame = cap.read()

            #img = cv2.imread("image.png")

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)
            me = me_cascade.detectMultiScale(gray, 1.3, 5)

            resized_frame = cv2.resize(frame, (150, 150), interpolation=cv2.INTER_AREA).reshape((-1, 150, 150, 3))
            output = model.predict(resized_frame)
            label = ''
            #db.update({'me': "off"})
            if (np.argmax(output) == 0):
                label = 'key detected'
            elif (np.argmax(output) == 1):
                label = 'other'
            elif (np.argmax(output) == 2):
                label = 'package detected'

            for (x, y, w, h) in me:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 0), 2)
                cv2.putText(frame, "Owner", (50, 50), cv2.FONT_HERSHEY_COMPLEX, 2, (0, 0, 0), 2)
                db.update({'me': "on"})

            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
                face_y = y + 0.5 * h
                face_x = x + 0.5 * w
                db.update({"x": face_x, "y": face_y})

            if (label != 'other'):
                cv2.putText(frame, label, (100, 100), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 0, 0), 2)

            t2 = time.time()
            # print(t2-t1)
            # Display the frame
            cv2.imshow('frame', frame)
            # t1 = time.time()
            # print(t1 - t0)
            # cv2.imwrite("new_image2.png", frame,[cv2.IMWRITE_PNG_COMPRESSION, 8])

            #db.update({'label':label})
            # storage.child("new_image.png").put("new_image.png")

            t3 = time.time()
            # print(t3-t2)
            # print("photo saved")
            if cv2.waitKey(5) & 0xFF == ord('q'):
                break
        else: pass



    # When everything is done, release the capture
    cap.release()
    cv2.destroyAllWindows()




