export default function Footer() {
    return(
  <footer className="w-full ">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-primary">
      <span className="text-xl">©</span> 
      <span>2025 | Created by:</span>
      <div className="flex font-bold gap-4">
        <a
          href="https://www.linkedin.com/in/yuvraj-095760328"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Yuvraj
        </a>
        <span><strong>|</strong></span>
        <a
          href="https://www.linkedin.com/in/amancrafts-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Aman Singh
        </a>
      </div>
    </div>
  </footer>
    )
}
