import cv2
cap = cv2.VideoCapture(0)
from keras.models import load_model
import numpy as np



model = load_model("./model/final_model.h5")
model.compile(loss='sparse_categorical_crossentropy',optimizer='rmsprop',metrics=['accuracy'])


def camera():
    ret, frame = cap.read()
    face_cascade = cv2.CascadeClassifier('./data/haarcascade_frontalface_default.xml')
    me_cascade = cv2.CascadeClassifier('./data/cascade_me.xml')

    gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
    resized_frame = cv2.resize(frame,(150,150),interpolation=cv2.INTER_AREA).reshape((-1,150,150,3))

    output = model.predict(resized_frame)
    label = ''
    if(np.argmax(output) == 0 ):
        label='key detected'
    elif(np.argmax(output)==1):
        label='other'
    elif(np.argmax(output)==2):
        label='package detected'

    faces = face_cascade.detectMultiScale(gray,1.3,5)
    me = me_cascade.detectMultiScale(gray,1.3,5)

    for (x, y, w, h) in me:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 0), 2)
        cv2.putText(frame, "Owner", (50, 50), cv2.FONT_HERSHEY_COMPLEX, 2, (0, 0, 0), 2)

    for (x,y,w,h) in faces:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)
    if(label!='other'):
        cv2.putText(frame,label,(100,100), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 0, 0), 2)
    cv2.imshow('frame',frame)
