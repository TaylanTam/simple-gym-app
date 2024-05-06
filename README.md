# Simple Gym App

## Setup

### Frontend
Navigate to the frontend folder and execute the following commands:
 ```shell
npm install
npm start
```
### Backend
Navigate to the backend folder.

#### Mac OS / Linux

```shell
python3.10 -m venv env
source env/bin/activate   
```

#### Windows

```shell
virtualenv --python=/usr/bin/python3.10 venv 
venv\Scripts\activate    
```

#### Run in a terminal

```shell
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata ./core/fixtures/exercise.json
python manage.py createsuperuser
python manage.py runserver
```