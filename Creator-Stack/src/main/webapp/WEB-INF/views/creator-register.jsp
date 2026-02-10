<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Creator Registration</title>
</head>
<body>

<h2>Creator Registration</h2>

<form action="/creator/register" method="post">

    <label>Username:</label><br/>
    <input type="text" name="username" required /><br/><br/>

    <label>Password:</label><br/>
    <input type="password" name="password" required /><br/><br/>

    <label>Email:</label><br/>
    <input type="email" name="email" required /><br/><br/>

    <label>Mobile:</label><br/>
    <input type="text" name="mobile" /><br/><br/>

    <button type="submit">Register</button>

</form>

</body>
</html>
