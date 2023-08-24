<h1>
    Learning Node(express)
</h1>

<h3>so far we updated our Student model, now it have 3 relations with 3 type of rels in MongoDB</h3>

<ol>
<li>normalization(refrence) -> friends</li>
<li>denormalization(embeded/nested) -> tags</li>
<li>hybrid -> courses</li>
</ol>

<hr>
in this commit we created some end point to manage student_friends
in this case Student.friends is a rel to itself which means this field contains an Object_id which refrence Student model itself.   

there is also a little more detail for example using populate and using child-routes(students_friends) in parent-routes(student_routes)   
