const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    /* In tailwindcss, if you want to add an
    image as background just use bg-filename,
    for example: bg-dotted-pattern */
    <div className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
      {children}
    </div>
  );
};

export default Layout;
