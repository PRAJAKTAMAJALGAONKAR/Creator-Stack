<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<!DOCTYPE html>
<html>
<head>
    <title>Creator Dashboard</title>

    <style>
        body {
            margin: 0;
            font-family: Inter, Arial, sans-serif;
            background: #f8f8f8;
        }

        .layout {
            display: flex;
            height: 100vh;
        }

        .sidebar {
            width: 220px;
            background: #111;
            color: #fff;
            padding: 20px;
        }

        .sidebar h2 {
            margin-top: 0;
            font-size: 20px;
            margin-bottom: 30px;
        }

        .sidebar a {
            display: block;
            color: #ccc;
            text-decoration: none;
            margin-bottom: 15px;
            font-size: 14px;
        }

        .sidebar a:hover {
            color: #fff;
        }

        .main {
            flex: 1;
            padding: 30px;
            overflow-y: auto;
        }

        .topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .topbar h1 {
            margin: 0;
            font-size: 24px;
        }

        .primary-btn {
            background: #ff90e8;
            border: none;
            padding: 10px 16px;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            color: #000;
        }

        .primary-btn:hover {
            background: #ff6fd8;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 20px;
        }

        .card {
            background: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .card h3 {
            margin-top: 0;
            font-size: 16px;
        }

        .card p {
            font-size: 14px;
            color: #555;
        }

        .card-footer {
            margin-top: 15px;
            font-size: 13px;
            color: #888;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-footer a {
            font-weight: bold;
            text-decoration: none;
            color: #4f46e5;
        }

        .card-footer a:hover {
            text-decoration: underline;
        }

        .empty {
            margin-top: 40px;
            text-align: center;
            color: #777;
        }
    </style>
</head>

<body>

<div class="layout">

    <div class="sidebar">
        <h2>Creator</h2>
        <a href="/creator/dashboard">Home</a>
        <a href="#">Products</a>
        <a href="#">Sales</a>
        <a href="#">Analytics</a>
        <a href="/logout">Logout</a>
    </div>

    <div class="main">

        <div class="topbar">
            <h1>
                Welcome, <b>${sessionScope.creator.username}</b>
            </h1>

            <a href="/creator/create" class="primary-btn">
                + Create Product
            </a>
        </div>

        <c:choose>

            <c:when test="${empty contents}">
                <div class="empty">
                    <h3>No products yet</h3>
                    <p>Create your first product to get started 🚀</p>
                    <br/>
                    <a href="/creator/create" class="primary-btn">
                        + Create Product
                    </a>
					<a href="/creator/sell" class="primary-btn">
					    💰 Create Sell Link
					</a>

                </div>
            </c:when>

            <c:otherwise>
                <div class="cards">
                    <c:forEach items="${contents}" var="c">
                        <div class="card">

                            <h3>${c.prompt}</h3>

                            <p>Price: ₹${c.price}</p>

                            <div class="card-footer">
                                <span>ID: ${c.id}</span>

                                <a href="/creator/upload?contentId=${c.id}">
                                    Upload Files
                                </a>
								<a href="/creator/product?contentId=${c.id}">
								    Manage
								</a>
								<a href="/creator/sell?contentId=${c.id}">
								    💰 Sell
								</a>

                            </div>

                        </div>
                    </c:forEach>
                </div>
            </c:otherwise>

        </c:choose>

    </div>
</div>

</body>
</html>
