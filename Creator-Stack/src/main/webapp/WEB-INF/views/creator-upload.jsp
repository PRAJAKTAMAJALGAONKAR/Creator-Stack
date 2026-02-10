<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Upload Files</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f7fa;
        }

        .container {
            width: 420px;
            margin: 60px auto;
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        label {
            font-weight: bold;
            display: block;
            margin-top: 15px;
        }

        input[type="file"],
        select {
            width: 100%;
            margin-top: 8px;
        }

        button {
            margin-top: 25px;
            width: 100%;
            padding: 10px;
            background-color: #4f46e5;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 15px;
            cursor: pointer;
        }

        button:hover {
            background-color: #4338ca;
        }

        .note {
            margin-top: 15px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>

<div class="container">

    <h2>Upload Content File</h2>

	<form action="/creator/upload"
	      method="post"
	      enctype="multipart/form-data">

	    <input type="hidden" name="contentId" value="${contentId}" />

	    <label>File type</label>
	    <select name="fileType" required>
	        <option value="IMAGE">Image</option>
	        <option value="VIDEO">Video</option>
	        <option value="DOCUMENT">Document</option>
	        <option value="AUDIO">Audio</option>
	    </select>

	    <br/><br/>

	    <input type="file" name="file" required />

	    <br/><br/>

	    <button type="submit">Upload</button>
	</form>


    <div class="note">
        Files are securely stored and linked to this content.
    </div>

</div>

</body>
</html>

