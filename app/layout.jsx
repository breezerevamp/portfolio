import '@styles/globals.css'


export const metadata = {
  title: 'Breeze',
  description: 'Portfolio for thatbreezedev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='galaxy'>{children}</body>
    </html>
  )
}
