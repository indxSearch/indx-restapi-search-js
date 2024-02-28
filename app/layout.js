import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

      {/* General Meta Tags */}
      <title>Indx Search System / RestAPI Local demo</title>
      <meta name="description" content="Advanced search with pattern recognition for faster and more precise results."/>

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://indx.co"/>
      <meta property="og:type" content="website"/>
      <meta property="og:title" content="indx - Next Generation Search System"/>
      <meta property="og:description" content="Advanced search with pattern recognition for faster and more precise results."/>
      <meta property="og:image" content="https://indx.co/opengraph.png"/>

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta property="twitter:domain" content="indx.co"/>
      <meta property="twitter:url" content="https://indx.co"/>
      <meta name="twitter:title" content="indx - Next Generation Search System"/>
      <meta name="twitter:description" content="Advanced search with pattern recognition for faster and more precise results."/>
      <meta name="twitter:image" content="https://indx.co/opengraph.png"/>
      <meta name="twitter:site" content="@@indxsearch" />
      <meta name="twitter:creator" content="@@naero" />

      <link rel="icon" type="image/png" href="favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
