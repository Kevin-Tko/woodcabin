function AddCabinForm() {
    return (
        <form className="form">
            <div className="formRow">
                <label htmlFor="name" className="label">
                    Cabin name
                </label>
                <input type="text" id="name" className="input" />
            </div>
            <div className="formRow">
                <label htmlFor="capacity" className="label">
                    Maximum capacity
                </label>
                <input type="text" id="capacity" className="input" />
            </div>
            <div className="formRow">
                <label htmlFor="price" className="label">
                    Regular price
                </label>
                <input type="text" id="price" className="input" />
            </div>
            <div className="formRow">
                <label htmlFor="discount" className="label">
                    Discount
                </label>
                <input type="text" id="discount" className="input" />
            </div>
            <div className="formRow">
                <label htmlFor="discount" className="label">
                    Description
                </label>
                <textarea type="text" id="discount" className="input" />
            </div>
            <div className="formRow">
                <label htmlFor="image" className="label">
                    Image
                </label>
                <input type="text" id="image" className="input" />
            </div>
        </form>
    )
}

export default AddCabinForm
