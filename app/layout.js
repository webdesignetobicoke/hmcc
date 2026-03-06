import { Merriweather, Inter } from 'next/font/google'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Housing Market Crash Calculator',
  description: 'Analyze absorption rates to identify market turning points',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${merriweather.variable} ${inter.variable}`}>
      <head>
        <style>{`
          * {
            font-family: system-ui, -apple-system, sans-serif;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
