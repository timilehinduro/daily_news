# DailyNews

DailyNews is a content generation, fact-checking, and content-processing web application designed to streamline the creation and verification of news articles. It allows users to generate content, automatically fact-check claims, categorize and tag articles, and publish verified information. The platform also enables user interactions, including liking, commenting, sharing, and bookmarking content.

### Features

* Content Generation – AI-powered article generation.

* Fact-Checking – Automatic verification of claims using external fact-checking sources.

* Content Processing – Categorization, tagging, and publication decision-making.

* User Interaction – Users can like, comment, share, and bookmark content.

* User Authentication – Users enter a unique ID before interacting with content.


### Tech Stack

* Backend: Python, Django, Django REST Framework

* Database: PostgreSQL

* Frontend: (Handled by a separate team)

* Deployment: Render


#### Installation & Setup

1.⁠ ⁠Clone the repository:

git clone https://github.com/YOUR-USERNAME/DailyNews.git
cd DailyNews


2.⁠ ⁠Create and activate a virtual environment:

python -m venv venv  
source venv/bin/activate  # On Windows, use venv\Scripts\activate


3.⁠ ⁠Install dependencies:

pip install -r requirements.txt


4.⁠ ⁠Run migrations:

python manage.py migrate


5.⁠ ⁠Start the development server:

python manage.py runserver



API Endpoints

POST /api/user/login/ – Start a session with a user ID.

GET /news/written/ – Retrieve all written content.

POST /news/written/{id}/like/ – Like an article.

POST /news/written/{id}/comment/ – Add a comment.

POST /news/written/{id}/share/ – Share an article.

POST /news/written/{id}/bookmark/ – Bookmark an article.

More endpoints are available in the API documentation.


Contributing

1.⁠ ⁠Fork the repository.


2.⁠ ⁠Create a feature branch (git checkout -b feature-name).


3.⁠ ⁠Commit changes (git commit -m "Feature description").


4.⁠ ⁠Push to GitHub (git push origin feature-name).


5.⁠ ⁠Open a pull request.



License

This project is licensed under the MIT License.
