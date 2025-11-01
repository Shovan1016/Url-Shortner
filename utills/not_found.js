export const NOT_FOUND_HTML=`    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404 - Page Not Found</title>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: "Poppins", sans-serif;
          }
          body {
            background: linear-gradient(135deg, #141e30, #243b55);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            flex-direction: column;
          }
          h1 {
            font-size: 5rem;
            margin-bottom: 10px;
          }
          p {
            font-size: 1.2rem;
            color: #ddd;
            margin-bottom: 30px;
          }
          a {
            background: #00bcd4;
            color: #fff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            transition: 0.3s ease;
          }
          a:hover {
            background: #0097a7;
          }
        </style>
      </head>
      <body>
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn’t exist.</p>
      </body>
    </html>`