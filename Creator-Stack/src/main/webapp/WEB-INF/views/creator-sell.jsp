<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
    <title>Create Sell Link</title>

    <style>
        body {
            font-family: Inter, Arial, sans-serif;
            background: #f6f6f6;
            padding: 40px;
        }

        .card {
            background: white;
            max-width: 520px;
            margin: auto;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.06);
        }

        h2 { margin-top: 0; }

        .info {
            margin: 15px 0;
            font-size: 15px;
        }

        .btn {
            margin-top: 25px;
            padding: 12px;
            width: 100%;
            border: none;
            background: #ff90e8;
            font-weight: bold;
            font-size: 15px;
            border-radius: 8px;
            cursor: pointer;
        }

        .btn:hover {
            background: #ff6fd8;
        }

        .warning {
            margin-top: 20px;
            padding: 15px;
            background: #fff3cd;
            border-radius: 8px;
            color: #856404;
        }

        .link-box {
            margin-top: 25px;
            padding: 15px;
            background: #f4f4f4;
            border-radius: 6px;
            word-break: break-all;
        }
    </style>
</head>

<body>

<div class="card">

    <h2>Create Sell Link</h2>

    <div class="info">
        <b>Product:</b> ${content.prompt}
    </div>

    <div class="info">
        <b>Price:</b> ₹${content.price}
    </div>

    <!-- ❌ Stripe not ready -->
	<!-- ❌ No Stripe account -->
	<c:if test="${stripeAccountId == null}">
	    <div class="info">
	        <p>You must set up Stripe to start selling.</p>
	        <a class="btn" href="/creator/stripe/onboard">
	            Set up Stripe Account
	        </a>
	    </div>
	</c:if>

	<!-- ⏳ Stripe account exists, waiting for webhook -->
	<c:if test="${stripeAccountId != null && !chargesEnabled}">
	    <div class="info">
	        <p>We’re finalizing your Stripe setup.</p>
	        <p>This usually takes a few seconds.</p>

	        <!-- hidden initially -->
	        <div id="continue-setup" style="display:none; margin-top:12px;">
	            <p>If this is taking longer, please complete your Stripe setup.</p>
	            <a class="btn" href="/creator/stripe/onboard">
	                Complete Stripe Setup
	            </a>
	        </div>
	    </div>

	    <script>
	        setTimeout(function () {
	            document.getElementById("continue-setup").style.display = "block";
	        }, 5000); // 5 seconds
	    </script>
	</c:if>


	<!-- ✅ Stripe ready -->
	<c:if test="${stripeAccountId != null && chargesEnabled}">
	    <form method="post" action="/creator/sell">
	        <input type="hidden" name="contentId" value="${content.id}" />
	        <button class="btn">Generate Sell Link</button>
	    </form>
	</c:if>



    <!-- Sell link shown -->
    <c:if test="${not empty sellLink}">
        <div class="link-box">
            <b>Your Sell Link:</b><br/>
			<a href="${sellLink.url}" target="_blank">
			    ${sellLink.url}
			</a>
        </div>
    </c:if>

</div>

</body>
</html>
