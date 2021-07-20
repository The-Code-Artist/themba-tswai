const express = require("express");
const request = require("request");
const sendEmail = require("./src/smtp/mail");

require("dotenv").config();

const secret = process.env.G_RECAPTCHA_SECRET;

// Create an instance of an Express.js application.
const app = express();

// Middleware configuration.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/img", express.static(`${__dirname}/public/img`));
app.use("/js", express.static(`${__dirname}/public/js`));
app.use("/videos", express.static(`${__dirname}/public/videos`));

// Core app configuration.
app.set("views", `${__dirname}/src/views`);
app.set("view engine", "ejs");

// The app.HTTP_REQUEST_METHOD functions are used to define routes and handle HTTP requests.
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/contact", (req, res) => {
  if (!req.body.captcha) res.json({ msg: "CAPTCHA token is undefined." });

  const { name, email, enquiry, message, captcha } = req.body;

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha}`;

  request(verifyUrl, (error, response, body) => {
    if (error) console.log(error);

    body = JSON.parse(body);

    if (!body.success || body.score < 0.4) {
      return res.json({
        msg: "You might be a bot. Sorry...",
        score: body.score,
      });
    }

    const messageBody = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<!--[if !mso]><!-->
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<!--<![endif]-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />
	<title>Themba Tswai Contact Email</title>
	<style type="text/css">
		* {
			-webkit-font-smoothing: antialiased;
		}

		body {
			Margin: 0;
			padding: 0;
			min-width: 100%;
			font-family: Arial, sans-serif;
			-webkit-font-smoothing: antialiased;
			mso-line-height-rule: exactly;
		}

		table {
			border-spacing: 0;
			color: #333333;
			font-family: Arial, sans-serif;
		}

		img {
			border: 0;
		}

		.wrapper {
			width: 100%;
			table-layout: fixed;
			-webkit-text-size-adjust: 100%;
			-ms-text-size-adjust: 100%;
		}

		.webkit {
			max-width: 600px;
		}

		.outer {
			Margin: 0 auto;
			width: 100%;
			max-width: 600px;
		}

		.full-width-image img {
			width: 100%;
			max-width: 600px;
			height: auto;
		}

		.inner {
			padding: 10px;
		}

		p {
			Margin: 0;
			padding-bottom: 10px;
		}

		.h1 {
			font-size: 21px;
			font-weight: bold;
			Margin-top: 15px;
			Margin-bottom: 5px;
			font-family: Arial, sans-serif;
			-webkit-font-smoothing: antialiased;
		}

		.h2 {
			font-size: 18px;
			font-weight: bold;
			Margin-top: 10px;
			Margin-bottom: 5px;
			font-family: Arial, sans-serif;
			-webkit-font-smoothing: antialiased;
		}

		.one-column .contents {
			text-align: left;
			font-family: Arial, sans-serif;
			-webkit-font-smoothing: antialiased;
		}

		.one-column p {
			font-size: 14px;
			Margin-bottom: 10px;
			font-family: Arial, sans-serif;
			-webkit-font-smoothing: antialiased;
		}

		.two-column {
			text-align: center;
			font-size: 0;
		}

		.two-column .column {
			width: 100%;
			max-width: 300px;
			display: inline-block;
			vertical-align: top;
		}

		.contents {
			width: 100%;
		}

		.two-column .contents {
			font-size: 14px;
			text-align: left;
		}

		.two-column img {
			width: 100%;
			max-width: 280px;
			height: auto;
		}

		.two-column .text {
			padding-top: 10px;
		}

		.three-column {
			text-align: center;
			font-size: 0;
			padding-top: 10px;
			padding-bottom: 10px;
		}

		.three-column .column {
			width: 100%;
			max-width: 200px;
			display: inline-block;
			vertical-align: top;
		}

		.three-column .contents {
			font-size: 14px;
			text-align: center;
		}

		.three-column img {
			width: 100%;
			max-width: 180px;
			height: auto;
		}

		.three-column .text {
			padding-top: 10px;
		}

		.img-align-vertical img {
			display: inline-block;
			vertical-align: middle;
		}

		@media only screen and (max-device-width: 480px) {

			table[class=hide],
			img[class=hide],
			td[class=hide] {
				display: none !important;
			}

			.contents1 {
				width: 100%;
			}

			.contents1 {
				width: 100%;
			}
		}
	</style>
	<!--[if (gte mso 9)|(IE)]>
	<style type="text/css">
		table {border-collapse: collapse !important;}
	</style>
	<![endif]-->
</head><body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#ececec;">
<center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#ececec;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ececec;" bgcolor="#ececec;">
    <tr>
      <td width="100%"><div class="webkit" style="max-width:600px;Margin:0 auto;"> 
          
          <!--[if (gte mso 9)|(IE)]>

						<table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0" >
							<tr>
								<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
								<![endif]--> 
          
          <!-- ======= start main body ======= -->
          <table class="outer" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;Margin:0 auto;width:100%;max-width:600px;">
            <tr>
              <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><!-- ======= start header ======= -->
                
                <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                  <tr>
                    <td>
						<table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td align="center">
								<center>
                                <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                  <tbody>
                                    <tr>
                                      <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0">
                                          <tr>
                                            <td>&nbsp;</td>
                                          </tr>
                                          <tr>
                                            <td align="center">&nbsp;</td>
                                          </tr>
                                          <tr>
                                            <td height="6" bgcolor="#7B6054" class="contents" style="width:100%; border-top-left-radius:10px; border-top-right-radius:10px"></td>
                                          </tr>
                                        </table></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </center></td>
                          </tr>
                        </tbody>
                      </table></td>
                  </tr>
                </table>
                <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                  <tr>
                    <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td align="center"><center>
                                <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                  <tbody>
                                    <tr>
                                      <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" bgcolor="#FFFFFF"><!-- ======= start header ======= -->
                                        
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                          <tr>
                                            <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0;"><!--[if (gte mso 9)|(IE)]>
													<table width="100%" style="border-spacing:0" >
													<tr>
													<td width="20%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
													<![endif]-->
                                              
                                              <div class="column" style="width:100%;max-width:110px;display:inline-block;vertical-align:top;">
                                                <table class="contents" style="border-spacing:0; width:100%"  bgcolor="#ffffff" >
                                                </table>
                                              </div>
                                              
                                              <!--[if (gte mso 9)|(IE)]>
													</td><td width="80%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
													<![endif]-->
                                              
                                              <div class="column" style="width:100%;max-width:415px;display:inline-block;vertical-align:top;">
                                                <table width="100%" style="border-spacing:0" bgcolor="#ffffff">
                                                  <tr>
                                                    <td><table width="100%" border="0" cellspacing="0" cellpadding="0" class="hide">
                                                        <tr>
                                                          <td height="60">&nbsp;</td>
                                                        </tr>
                                                      </table></td>
                                                  </tr>
                                                  <tr>
                                                    <td class="inner" style="padding-top:10px;padding-bottom:10px; padding-right:10px;padding-left:10px;"><table class="contents" style="border-spacing:0; width:100%" bgcolor="#FFFFFF">
                                                      </table></td>
                                                  </tr>
                                                </table>
                                              </div>
                                              
                                              <!--[if (gte mso 9)|(IE)]>
													</td>
													</tr>
													</table>
													<![endif]--></td>
                                          </tr>
                                          <tr>
                                            <td align="left" style="padding-left:40px"><table border="0" cellpadding="0" cellspacing="0" style="border-bottom:2px solid #ddd" align="left">
                                                <tr>
                                                  <td height="20" width="30" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                                                </tr>
                                              </table></td>
                                          </tr>
                                          <tr>
                                            <td>&nbsp;</td>
                                          </tr>
                                        </table></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </center></td>
                          </tr>
                        </tbody>
                      </table></td>
                  </tr>
                </table>
                
                <!-- ======= end header ======= --> 
                
                <!-- ======= start hero image ======= --><!-- ======= end hero image ======= --> 
                
                <!-- ======= start hero article ======= -->
                
                <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0" bgcolor="#FFFFFF">
                  <tr>
                    <td align="left" style="padding:0px 40px 40px 40px"><p style="color:#5b5f65; font-size:28px; text-align:left; font-family: Verdana, Geneva, sans-serif">Awe Themba, </p>
                      <p style="color:#5b5f65; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif">A prospect has attempted to contact you through the website\'s contact form. The details are listed below:<br />
                        <hr />
						<b>Name: </b>${name}<br />
						<b>Email: </b>${email}<br />
						<b>Enquiry: </b>${enquiry}<br />
						<b>Message: </b>${message}
					</p>                      
                    </td>
                  </tr>
                </table>
                
                <!-- ======= end hero article ======= -->  
                
                <!-- ======= start footer ======= -->
                
               <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td><table width="100%" cellpadding="0" cellspacing="0" border="0"  bgcolor="#7B6054">
      <tr>
        <td height="40" align="center" bgcolor="#7B6054" class="one-column">&nbsp;</td>
      </tr>
      <tr>
        <td align="center" bgcolor="#7B6054" class="one-column" style="padding-top:0;padding-bottom:0;padding-right:10px;padding-left:10px;"><font style="font-size:13px; text-decoration:none; color:#ffffff; font-family: Verdana, Geneva, sans-serif; text-align:center" style="color: #DDD2CC">Themba Tswai</font></td>
      </tr>
      <tr>
        <td align="center" bgcolor="#7B6054" class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">&nbsp;</td>
      </tr>
      <tr style="color: #DDD2CC">
        <td align="center" bgcolor="#7B6054" class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><table width="150" border="0" cellspacing="0" cellpadding="0">
          <tr>
			<td width="33" align="center">
				<a href="https://www.linkedin.com/in/themba-tswai" target="_blank">
					<i class="fa fa-linkedin"></i>
				</a>
		</td>
            <td width="33" align="center">
				<a href="https://instagram.com/themba_tswai/" target="_blank">
					<i class="fa fa-instagram"></i>
				</a>
		</td>
          </tr>
		</table>
	</td>
      </tr>
      <tr>
        <td align="center" bgcolor="#7B6054" class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">&nbsp;</td>
      </tr>
      <tr>
        <td align="center" bgcolor="#7B6054" class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">&nbsp;</td>
      </tr>
      <tr>
        <td height="6" bgcolor="#7B6054" class="contents1" style="width:100%; border-bottom-left-radius:10px; border-bottom-right-radius:10px"></td>
      </tr>
      </table></td>
  </tr>
  <tr>
    <td><table width="100%" cellpadding="0" cellspacing="0" border="0"> 
      <tr>
        <td height="6" bgcolor="#7B6054" class="contents" style="width:100%; border-bottom-left-radius:10px; border-bottom-right-radius:10px"></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>

               <!-- ======= end footer ======= --></td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
					</td>
				</tr>
			</table>
			<![endif]--> 
        </div></td>
    </tr>
  </table>
</center>
</body></html>`;

    sendEmail(
      email,
      `Themba Tswai Contact Form - ${enquiry}`,
      messageBody,
      (err, data) => {
        if (err) {
          res.status(500).json({ msg: "An internal error occurred." });
        } else {
          return res.json({
            msg: "Your message has successfully been sent to Themba Tswai. You'll be hearing from him soon.",
          });
        }
      }
    );
  });
});

// Initiate the HTTP server and let it listen to any port desired.
app.listen(3000, () => {
    console.info("The web app has started and is listening at port: 3000.");
});
