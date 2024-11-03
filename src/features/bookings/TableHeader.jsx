function TableHeader() {
    return (
        <div className="grid grid-cols-6  bg-stone-300 py-3 px-4 gap-12 justify-items-center ">
            <p className="justify-self-start p-1">Cabin</p>
            <p className="justify-self-start p-1">Guest</p>
            <p className="justify-self-start p-1">Dates</p>
            <p className="justify-self-start p-1">Status</p>
            <p className="justify-self-start p-1">Amount</p>
        </div>
    )
}

export default TableHeader
