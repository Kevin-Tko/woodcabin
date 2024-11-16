function TableHeader() {
    return (
        <div className="grid grid-cols-8  bg-stone-300 py-3 px-4 gap-12 justify-items-center ">
            <p className="justify-self-start p-1">Cabin</p>
            <p className="justify-self-center p-1 col-span-2">Guest</p>
            <p className="justify-self-start p-1 ">Days</p>
            <p className="justify-self-center p-1 col-span-2">Status</p>
            <p className="justify-self-start p-1">Amount</p>
        </div>
    )
}

export default TableHeader
