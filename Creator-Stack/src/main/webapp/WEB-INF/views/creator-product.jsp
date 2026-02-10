<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Manage Product</title>

    <style>
        body {
            font-family: Arial;
            background: #f6f6f6;
            padding: 30px;
        }

        .card {
            background: white;
            padding: 25px;
            border-radius: 8px;
            max-width: 800px;
            margin: auto;
        }

        h2 {
            margin-top: 0;
        }

        .actions {
            margin-bottom: 20px;
        }

        .actions a {
            margin-right: 10px;
            font-weight: bold;
        }

        .btn {
            padding: 10px 15px;
            background: #4f46e5;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }

        .btn-danger {
            background: #dc2626;
        }

        .files {
            margin-top: 20px;
        }

        .file {
            padding: 12px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .file span {
            font-size: 14px;
        }

        .file a {
            font-size: 13px;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>

<body>

<div class="card">

    <h2>${content.prompt}</h2>
    <p><b>Price:</b> ₹${content.price}</p>

    <!-- ACTION BUTTONS -->
	<div class="actions">

	    <a class="btn" href="/creator/upload?contentId=${content.id}">
	        Upload Files
	    </a>

	    <a class="btn" href="/creator/dashboard">
	        Back to Dashboard
	    </a>

	    <!-- DELETE PRODUCT -->
	    <form action="/creator/content/delete"
	          method="post"
	          style="display:inline"
	          onsubmit="return confirm('Delete this product permanently?');">

	        <input type="hidden" name="contentId" value="${content.id}" />

	        <button class="btn btn-danger">
	            Delete Product
	        </button>
	    </form>

	</div>


    <!-- FILE LIST -->
    <div class="files">
        <h3>Uploaded Files</h3>

        <c:choose>
            <c:when test="${empty files}">
                <p>No files uploaded yet.</p>
            </c:when>

            <c:otherwise>
                <c:forEach items="${files}" var="f">
                    <div class="file">
                        <span>
                            ${f.fileType} — ${f.size} bytes
                        </span>

                        <a class="btn btn-danger"
                           href="/creator/file/delete?fileId=${f.id}&contentId=${content.id}"
                           onclick="return confirm('Are you sure you want to delete this file?')">
                            Delete
                        </a>
                    </div>
                </c:forEach>
            </c:otherwise>
        </c:choose>
    </div>

</div>

</body>
</html>
