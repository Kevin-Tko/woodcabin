function Header() {
    return (
        <header className="py-1 px-2 pr-4 flex items-center justify-end gap-6 bg-stone-100">
            <div className="flex flex-row items-center gap-3">
                <img
                    src="images/dev-profile.jpg"
                    alt="user-profile"
                    className="max-h-12 inline-block border-none rounded-full"
                />
                <p>UserName</p>
            </div>
            <div className="flex-row items-center gap-3 hidden mobile:flex">
                <p>Account</p>
                <p>DarkMode</p>
                <p>Logout</p>
            </div>
        </header>
    )
}

export default Header
