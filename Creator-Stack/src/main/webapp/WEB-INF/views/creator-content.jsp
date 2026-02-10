<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Create Content</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            padding: 40px;
        }
        .card {
            width: 420px;
            margin: auto;
            background: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        h2 {
            margin-bottom: 20px;
        }
        input, textarea {
            width: 100%;
            padding: 10px;
            margin-top: 8px;
            margin-bottom: 15px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
        button {
            width: 100%;
            padding: 12px;
            background: #4f46e5;
            color: white;
            border: none;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background: #4338ca;
        }
    </style>
</head>
<body>

<div class="card">
    <h2>Create Content</h2>

    <form action="/creator/content" method="post">

        <label>Title / Prompt</label>
        <textarea name="prompt" required></textarea>

        <label>Price (₹)</label>
        <input type="number" name="price" required />

        <button type="submit">Create & Upload Files</button>

    </form>
</div>

</body>
</html>
