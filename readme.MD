<h1>
    Learning Node(express)
</h1>

<h3>so far we updated our Student model, now it have 3 relations with 3 type of relations in MongoDB</h3>

<ol>
<li>normalization(reference) -> friends</li>
<li>demoralization(embedded/nested) -> tags</li>
<li>hybrid -> courses</li>
</ol>

<hr>
in this commit we created some end point to manage student_friends
in this case Student.friends is a rel to itself which means this field contains an Object_id which refrence Student model itself.   

there is also a little more detail for example using populate and using child-routes(students_friends) in parent-routes(student_routes)   

<hr>
<h2> there is a list of notes in our project that either explain something or teach something :</h2>
<ul>
<li>/config/help.txt</li>
<li>/data/transactions.txt</li>
<li>/middleware/transactions.txt</li>
<li>/routes/auth_routes/*.txt</li>
<li>error_handling.txt</li>
</ul>