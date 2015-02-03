<?php
//Generic Functions
include_once "var.php";
include_once "val.php";

/* Build fields for the form. */
$arrFields = array();
$x=0;
$msgError = '';

/* If the form has been posted, validate it. */
//print_r($_POST);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	/* Take all posted variables and turn them into session variables. */
	session_start();
	foreach ($_POST as $key => $value){
		if (is_array($_POST[$key])){
			for ($x=0; $x<count($_POST[$key]);$x++){ // as $arrValue){
				$_SESSION[$key][$x] = htmlentities($_POST[$key][$x], ENT_QUOTES);
			}
		}else{
			$_SESSION[$key] = htmlentities($value, ENT_QUOTES);
		}
	}

	if (!$_POST['swch']){
		$msgError = validate("eng");
		if ($msgError != ''){
			$msgError = '<p class="color-attention">Please correct the following error(s) before proceeding:</p><ul class="color-attention noBullet">' . $msgError . '</ul>';
		}else{
			$nextURL = 'Location: final-finale-eng.php';
			header( $nextURL );
		}
	}/*else{
		$nextURL = 'Location: form-formule-fra.php';
		header( $nextURL );
	}*/
}
?>
<!DOCTYPE html>
<!--[if lt IE 9]><html class="no-js lt-ie9" lang="en"><![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->
<head>
<meta charset="utf-8"/>
<title>Report a Side Effect - Health Product Register</title>
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta name="description" content="**desc**" />
<meta name="dcterms.creator" content="**creator**" />
<meta name="dcterms.title" content="**title**" />
<meta name="dcterms.issued" title="W3CDTF" content="**issued**" />
<meta name="dcterms.modified" title="W3CDTF" content="**modified**" />
<meta name="dcterms.subject" title="gccore" content="**subject**" />
<meta name="dcterms.language" title="ISO639-2" content="eng"/>
<!--[if gte IE 9 | !IE ]><!-->
<link href="/hpr-rps/distro/assets/favicon.ico" rel="icon" type="image/x-icon"/>
<link rel="stylesheet" href="/hpr-rps/distro/css/wet-boew.min.css"/>
<!--<![endif]-->
<link rel="stylesheet" href="/hpr-rps/distro/css/theme.min.css"/>
<!--[if lt IE 9]><link href="/hpr-rps/distro/assets/favicon.ico" rel="shortcut icon"/> <link rel="stylesheet" href="/hpr-rps/distro/css/ie8-wet-boew.min.css"/> <link rel="stylesheet" href="/hpr-rps/distro/css/ie8-theme.min.css"/> <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> <script src="/hpr-rps/distro/js/ie8-wet-boew.min.js"></script><![endif]-->
<noscript>
<link rel="stylesheet" href="/hpr-rps/distro/css/noscript.min.css"/>
</noscript>
<link rel="stylesheet" href="includes/digi/digi.css" />
</head><body vocab="http://schema.org/" typeof="WebPage">
<ul id="wb-tphp">
  <li class="wb-slc"> <a class="wb-sl" href="#wb-cont">Skip to main content</a> </li>
  <li class="wb-slc visible-md visible-lg"> <a class="wb-sl" href="#wb-info">Skip to site information</a> </li>
</ul>
<header role="banner">
<div id="wb-bnr">
  <div id="wb-bar">
    <div class="container">
      <div class="row">
        <object id="gcwu-sig" type="image/svg+xml" tabindex="-1" data="/hpr-rps/distro/assets/sig-en.svg" aria-label="Government of Canada">
        </object>
        <ul id="gc-bar" class="list-inline">
          <li><a href="http://www.canada.ca/en/index.html" rel="external">Canada.ca</a></li>
          <li><a href="http://www.canada.ca/en/services/index.html" rel="external">Services</a></li>
          <li><a href="http://www.canada.ca/en/gov/dept/index.html" rel="external">Departments</a></li>
          <li id="wb-lng">
            <h2>Language selection</h2>
            <ul class="list-inline">
              <li><a href="form-formule-fra.php" lang="fr">Français</a></li>
            </ul>
          </li>
        </ul>
        <section class="wb-mb-links col-xs-12 visible-sm visible-xs" id="wb-glb-mn">
        <h2>Menu</h2>
        <ul class="pnl-btn list-inline text-right">
          <li><a href="#mb-pnl" title="Menu" aria-controls="mb-pnl" class="overlay-lnk btn btn-xs btn-default" role="button"><span class="glyphicon glyphicon-th-list"><span class="wb-inv">Menu</span></span></a></li>
        </ul>
        <div id="mb-pnl"></div>
        </section> </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div id="wb-sttl" class="col-md-5"> <a href="http://www.hc-sc.gc.ca/index-eng.php"> <span>Health Canada</span> </a> </div>
      <object id="wmms" type="image/svg+xml" tabindex="-1" data="/hpr-rps/distro/assets/wmms.svg" aria-label="Symbol of the Government of Canada">
      </object>
    </div>
  </div>
</div>
<nav role="navigation" id="wb-sm" data-ajax-fetch="/hpr-rps/distro/ajax/hpr_rps-eng.html" data-trgt="mb-pnl" class="wb-menu visible-md visible-lg" typeof="SiteNavigationElement">
<div class="container nvbar">
  <h2>Topics menu</h2>
  <div class="row">
    <ul class="list-inline menu">
      <li><a href="#">Search for Drug Products</a></li>
      <li><a href="#">Report a Side Effect</a></li>
      <li><a href="#">About</a></li>
    </ul>
  </div>
</div>
</nav> <nav role="navigation" id="wb-bc" property="breadcrumb">
<h2>You are here:</h2>
<div class="container">
  <div class="row">
   <ol class="breadcrumb">
	 <!-- 
      <li> <a href="http://www.hc-sc.gc.ca/index-eng.php">Home</a> </li>
      <li> <a href="http://www.hc-sc.gc.ca/dhp-mps/index-eng.php">Drugs &amp; Health Products</a> </li>
      <li> <a href="http://www.hc-sc.gc.ca/dhp-mps/prodpharma/index-eng.php">Drug Products</a> </li>
      <li>Report a side effect</li>-->
    </ol> 
  </div>
</div>
</nav> </header> <main role="main" property="mainContentOfPage" class="container">
<?php /* === DDD Code === */ ?>
<h1 id="wb-cont">Report a Side Effect</h1>
<?php /*?>
<p><?php echo $formAdText[0];?></p>
<?php */?>
<div class="accordion"> <details class="acc-group"> <summary class="wb-toggle tgl-tab" data-toggle='{"parent": ".accordion", "group": ".acc-group"}'>Privacy Statement</summary>
  <div class="tgl-panel"> <?php echo $priState[0];?> </div>
  </details> <details class="acc-group"> <summary class="wb-toggle tgl-tab" data-toggle='{"parent": ".accordion", "group": ".acc-group"}'>Instructions</summary>
  <div class="tgl-panel"> <?php echo $instr[0];?> </div>
  </details> <details class="acc-group"> <summary class="wb-toggle tgl-tab" data-toggle='{"parent": ".accordion", "group": ".acc-group"}'>About</summary>
  <div class="tgl-panel"> <?php echo $about[0];?> </div>
  </details> </div>
<hr />
<?php /*?>
<?php echo $pageError; ?>
<p><?php echo $stepData[0]->introText[0];?></p>
<div>
  <h2><?php echo $stepData[0]->stepTitle[0];?></h2>
</div>
<?php */?>
<?php echo $msgError;?>
<form name="aer" id="aer" method="post">
  <p class="text-danger font-small">* Mandatory Field</p>
  <div class="accordion">
    <div class="tabpanels"> <details class="acc-group"> <summary class="wb-toggle tgl-tab" data-toggle='{"parent": ".accordion", "group": ".acc-group"}'>A. About the person who had the side effect.</summary>
      <div class="tgl-panel">
        <?php $incForm = '01-en.php';
			include_once $incForm; //These files hold the actual form questions. ?>
      </div>
      </details> <details class="acc-group"> <summary class="wb-toggle tgl-tab" data-toggle='{"parent": ".accordion", "group": ".acc-group"}'>B. Reporter Information</summary>
      <div class="tgl-panel">
        <?php $incForm = '02-en.php';
			include_once $incForm; //These files hold the actual form questions. ?>
      </div>
      </details> <details class="acc-group"> <summary class="wb-toggle tgl-tab" data-toggle='{"parent": ".accordion", "group": ".acc-group"}'>C. Side Effect</summary>
      <div class="tgl-panel">
        <?php $incForm = '03-en.php';
			include_once $incForm; //These files hold the actual form questions. ?>
      </div>
      </details> <details class="acc-group"> <summary class="wb-toggle tgl-tab" data-toggle='{"parent": ".accordion", "group": ".acc-group"}'>D. Suspected Health Product</summary>
      <div class="tgl-panel">
        <?php $incForm = '04-en.php';
			include_once $incForm; //These files hold the actual form questions. ?>
      </div>
      </details> </div>
  </div>
  <hr />
  <?php /*
echo '<ul class="btn-toolbar list-inline" role="toolbar">
	<li class="btn-group">';
if ($currProgress > 1){
	echo '<input type="submit" name="submit-btn" id="submit-btn" value="Back" class="btn btn-default">';
}
echo '<a class="btn btn-default" href="form-formule-eng.php?clear=clear';
echo '&amp;prog=';
echo $currProgress;
echo (isset($_POST['filename'])?'&amp;filename='.$_POST['filename']:(isset($_REQUEST['filename'])?'&amp;filename='.$_REQUEST['filename']:'');
echo '" role="button">Clear</a>
	</li>'; */
?>
  <p>Before submitting your side effect report, please review the information you provided.</p>
  <ul>
    <li class="btn-group">
      <input type="submit" name="submit-btn" id="submit-btn" value="Submit<?php /*?>Next<?php */?>" class="btn btn-primary">
    </li>
  </ul>
  <?php /*?>
  <input type="hidden" value="<?php echo $filename;?>" name="filename" id="filename" />
  <input type="hidden" value="<?php echo $stepData[0]->formName;?>" name="formname" id="formname" />
  <input type="hidden" value="<?php echo $currProgress;?>" name="prog" id="prog" />
  <input type="hidden" value="form-formule-fra.php" name="langSwch" id="langSwch" />
  <?php */?>
  <input type="hidden" value="0" name="swch" id="swch" />
</form>
<?php /*?>
<div class="clear"></div>
<hr>
<h5>Progress</h5>
<progress value="<?php echo $currProgress;?>" max="<?php echo $maxStep+1;?>" style="width:100%;"><span class="wb-invisible"><?php echo $progPerc;?>%</span></progress>
<?php */?>
<!-- DDD Scripts -->
<script type="text/javascript">
	function swapField(id, box){
		if (document.getElementById(id).checked == true){
			document.getElementById(box).disabled = false;
		}else{
			document.getElementById(box).value = '';
			document.getElementById(box).disabled = true
		}
	}
	function subForm(){
		var form = document.getElementById("aer");
		document.getElementById("swch").value="1"
		form.action = "final-finale-eng.php";
		form.submit();
	}
	window.onload = function() {
		swapHeight('deathDate', 'textdeathDate');
		swapWeight('recovering', 'textrecovered');
		swapField('other', 'textreporterDescribe');
		swapField('deathDate', 'textdeathDate');
		swapField('recovering', 'textrecovered'	);
		swapField('countryOther', 'textpurchaseCountry');
		swapField('howOther', 'textpurchaseHow');
		//clearAll();
	}
</script>
<!-- end -->
<?php /* === END DDD Code === */ ?>
<dl id="wb-dtmd" property="dateModified">
  <dt>Date modified:&#32;</dt>
  <dd> <time>2014-11-14</time> </dd>
</dl>
</main> <footer role="contentinfo" id="wb-info" class="visible-sm visible-md visible-lg wb-navcurr">
<div class="container"> <nav role="navigation">
  <h2>Site information</h2>
  <ul id="gc-tctr" class="list-inline">
    <li><a rel="license" href="http://www.hc-sc.gc.ca/home-accueil/important-eng.php">Terms and conditions</a></li>
    <li><a href="http://www.hc-sc.gc.ca/home-accueil/rto-tor/index-eng.php">Transparency</a></li>
  </ul>
  <div class="row"> <section class="col-sm-3">
    <h3><a href="http://www.hc-sc.gc.ca/ahc-asc/index-eng.php">About</a></h3>
    <ul class="list-unstyled">
      <li><a href="http://www.hc-sc.gc.ca/ahc-asc/activit/about-apropos/index-eng.php">Mission, Values, Activities</a></li>
      <li><a href="http://www.hc-sc.gc.ca/home-accueil/help-aide/index-eng.php">Help</a></li>
      <li><a href="http://www.hc-sc.gc.ca/contact/faq-eng.php">Frequently Asked Questions</a></li>
      <li><a href="http://www.hc-sc.gc.ca/home-accueil/search-recherche/site-eng.php">Site Map</a></li>
    </ul>
    </section> <section class="col-sm-3">
    <h3><a href="http://www.hc-sc.gc.ca/contact/index-eng.php">Contact us</a></h3>
    <ul class="list-unstyled">
      <li><a href="http://www.hc-sc.gc.ca/contact/index-eng.php#a1">General Inquiries</a></li>
      <li><a href="http://www.hc-sc.gc.ca/contact/index-eng.php#a2">Contact Resources by Subject</a></li>
      <li><a href="http://www.hc-sc.gc.ca/contact/tech-eng.php">Technical Difficulties</a></li>
    </ul>
    </section> <section class="col-sm-3">
    <h3><a href="http://www.hc-sc.gc.ca/ahc-asc/media/index-eng.php">News</a></h3>
    <ul class="list-unstyled">
      <li><a href="http://www.hc-sc.gc.ca/ahc-asc/media/advisories-avis/index-eng.php">Advisories, Warnings and Recalls</a></li>
      <li><a href="http://www.hc-sc.gc.ca/ahc-asc/media/ftr-ati/_2014/index-eng.php">For the Record</a></li>
      <li><a href="http://www.hc-sc.gc.ca/ahc-asc/media/notices-avis/index-eng.php">Media Notices</a></li>
      <li><a href="http://news.gc.ca/web/nwsprdct-en.do?mthd=tp&amp;crtr.tp1D=1">News Releases</a></li>
    </ul>
    </section> <section class="col-sm-3">
    <h3><a href="http://www.hc-sc.gc.ca/home-accueil/sm-ms/index-eng.php">Stay connected</a></h3>
    <ul class="list-unstyled">
      <li><a href="http://www.hc-sc.gc.ca/home-accueil/sm-ms/protocol-facebook/index-eng.php">Facebook</a></li>
      <li><a href="http://www.pinterest.com/healthycdns/">Pinterest</a></li>
      <li><a href="https://twitter.com/healthcanada">Twitter</a></li>
      <li><a href="http://www.hc-sc.gc.ca/home-accueil/_feed-fils/index-eng.php">Rss Feeds</a></li>
      <li><a href="http://www.youtube.com/healthcanada">YouTube</a></li>
    </ul>
    </section> </div>
  </nav> </div>
<div id="gc-info">
  <div class="container"> <nav role="navigation">
    <h2>Government of Canada footer</h2>
    <ul class="list-inline">
      <li><a href="http://healthycanadians.gc.ca"><span>Health</span>healthycanadians.gc.ca</a></li>
      <li><a href="http://travel.gc.ca"><span>Travel</span>travel.gc.ca</a></li>
      <li><a href="http://www.servicecanada.gc.ca/eng/home.shtml"><span>Service Canada</span>servicecanada.gc.ca</a></li>
      <li><a href="http://www.jobbank.gc.ca"><span>Jobs</span>jobbank.gc.ca</a></li>
      <li><a href="http://actionplan.gc.ca/en"><span>Economy</span>actionplan.gc.ca</a></li>
      <li id="canada-ca"><a href="http://www.canada.ca/en/index.html">Canada.ca</a></li>
    </ul>
    </nav> </div>
</div>
</footer>
<!--[if gte IE 9 | !IE ]><!-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="/hpr-rps/distro/js/wet-boew.min.js"></script>


<!--<![endif]-->
<!--[if lt IE 9]><script src="/hpr-rps/distro/js/ie8-wet-boew2.min.js"></script><![endif]-->
</body>
</html>
