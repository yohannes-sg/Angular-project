[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/-A5HfnDf)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=12889335)
# CS569-Nov-2023-Final-Project
The project repository should be "Accepted/Forked" by team leaders only. One team member (team leader) will add their team members as "collaborators" so they could collaborate and push their daily progress.

## Medication Reviews/Side-Effects application:
The application helps users to review and report medication side effects.
1. Users signup and signin before they can use the application.
2. Users may add medications. The medication owner may update or delete their medication.
3. Users browse medications by the first letter [check example](https://www.drugs.com/drug_information.html). Display full alphabet letters, when a letter is clicked all medications starting with the letter are fetched and displayed.
4. Users may submit a new review and read previously submitted reviews. Review owners may update or delete their reviews.
  
### Application specifications and requirements
Your project must use the following:  
* Implement a login-based system with JWT.  
* Browsing and reading reviews is open to guests, but adding, updating, and deleting functionality is restricted to users.
* State properties in all components and services should be declared as signals.
* Use at least one featured lazy-loaded module.
* Projects must have proper UI that complies with the web standards.
   
### Notes
* Students are expected to be available on teams to receive calls and check on their progress.
* A daily push is required to track your code progress and measure your performance. 
* Do not spend more than one hour on a problem, move on, contact me, or find an alternative.
* Remember to update the .gitignore file so you do not push `node_modules` or any private keys from the `.env` file. 

## Need assistance?

Feel free to contact me any day between 8 AM and 8 PM. I’m available to assist all teams with all kinds of requests (system design, backend, frontend, fixing code bugs.. etc). The project is a learning experience and I want everyone to finish the project successfully and meet the course learning outcomes.

## Final Evaluation 

The submission deadline is on Friday at 9:00 PM. I will meet with every team individually on Saturday and Sunday and evaluate the final project code.  

Good luck, and happy coding!

_Code Honor Submission Policy: Remember to respect the code honor submission policy. All written code must be original. Presenting any code as one’s own work when it came from another source is plagiarism, which includes any matching patterns and code snippets, and will affect your grade. The use of AI is not permitted in this assignment. For more details, check the full course policies in the syllabus._

```typescript
User = { _id: string, fullname: string, email: string, password: string }
Image = { filename: string, originalname: string }
Review = { review: string, rating: number, by: { user_id: string, fullname: string }, date: number }
Owner = { user_id: string, fullname: string, email: string }
Medication = {
    name: string,
    first_letter: string,
    generic_name: string,
    medication_class: string,
    availability: string,
    image: Image,
    added_by: Owner,
    reviews: Review[]
}
// POST /users/signin
request_body = { "email": string, "password": string }
response_body = { "success": boolean, "data": User }
  
// POST /users/signup
request_body = { "fullname": string, "email": string, "password": string }
response_body = { "success": boolean, "data": string } // JWT token

// POST /medications
request_body = { "name": string, "generic_name": string, "medication_class": string, "availability": string }
request_multipart = "medication_image"
response_body = { "success": boolean, "data": Medication }

// GET /medications?first_letter=A
response_body = { "success": boolean, "data": Medication[] } // only name

// PUT /medications/:medication_id
request_body = { "name": string, "generic_name": string, "medication_class": string, "availability": string }
request_multipart = "medication_image"
response_body = { "success": boolean, "data": boolean }

// GET /medications/:medication_id
response_body = { "success": boolean, "data": Medication } // without reviews

// DELETE /medications/:medication_id
response_body = { "success": boolean, "data": boolean }

// POST /medications/:medication_id/reviews
request_body = { "review": string, "rating": string }
response_body = { "success": boolean, "data": string } // review_id

// GET /medications/:medication_id/reviews
response_body = { "success": boolean, "data": Review[] } // only name

// PUT /medications/:medication_id/reviews/:review_id
request_body = { "review": string, "rating": string }
response_body = { "success": boolean, "data": boolean }

// GET /medications/:medication_id/reviews/:review_id
response_body = { "success": boolean, "data": Review }

// DELETE /medications/:medication_id/reviews/:review_id
response_body = { "success": boolean, "data": boolean }

// GET /medications/images/:image_id
response_body = Binary of image file
```
