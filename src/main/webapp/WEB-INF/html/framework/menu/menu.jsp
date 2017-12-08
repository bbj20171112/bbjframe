<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Index Jsp</title>
<%@ include file="../css.jsp"%>

<script type="text/javascript" src="../../resources/framework/menu/js/navbar.js">
</script>

</head>
<body onload="initOnload()">
		<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">BBJ</a>
			</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav" id="menu-navbar">
					<li class="dropdown" style="display: none" name="first-level-menu">
						<a href="javascript:open()" class="dropdown-toggle" data-toggle="dropdown"
						role="button" aria-haspopup="true" aria-expanded="false"> <span
							name="first-level-menu-text">Dropdown</span> <span name="dropdown-icon" class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<li name="second-level-menu" style="display: none"><a href="#" name="second-level-menu-text">Dropdown</a></li>
						</ul>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown" role="button" aria-haspopup="true"
					aria-expanded="false">User<span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="#">Login</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">Logout</a></li>
					</ul></li>
			</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid --> </nav>
</body>
<%@ include file="../javascript.jsp"%>
</html>