<nav className="flex flex-col items-center justify-center bg-transparent text-black shadow-lg w-screen">
  <div className="flex items-center justify-center w-full">
    <img
      src="https://res.cloudinary.com/dlrlxxoue/image/upload/v1697219509/tutorlok_logo_final_kxarwk.png"
      alt="Logo"
      className="h-16 w-60 my-2 p-0" // Adjust the height and width as needed
    />
  </div>
  <div className="flex justify-end w-full p-4">
    <button
      className="bg-black hover-bg-blue-600 text-white font-bold py-1 px-4 rounded text-xl"
      onClick={navigateToTeacherLogin}
    >
      Login
    </button>
  </div>
</nav>;
