<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <title>Creator Login</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .login-container {
            background: #ffffff;
            padding: 30px;
            width: 350px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .login-container h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        .login-container input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        .login-container button {
            width: 100%;
            padding: 10px;
            background: #007bff;
            border: none;
            color: #fff;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
        }

        .login-container button:hover {
            background: #0056b3;
        }

        .error {
            color: red;
            text-align: center;
            margin-top: 10px;
        }

        .footer {
            text-align: center;
            margin-top: 15px;
            font-size: 14px;
        }
    </style>
</head>

<body>

<div class="login-container">
    <h2>Creator Login</h2>

    <form action="${pageContext.request.contextPath}/login" method="post">

        <input
                type="text"
                name="username"
                placeholder="Username"
                required
        />

        <input
                type="password"
                name="password"
                placeholder="Password"
                required
        />

        <button type="submit">Login</button>
    </form>

    <!-- Error message -->
    <c:if test="${not empty error}">
        <div class="error">
            ${error}
        </div>
    </c:if>

    <div class="footer">
        New creator?
        <a href="${pageContext.request.contextPath}/creator/register">
            Register here
        </a>
    </div>
</div>

</body>
</html>
