import Button from '../ui-component/Button'

function Dashboard() {
    return (
        <div>
            <h1>This is the dashboard page</h1>
            <div className="space-x-2">
                <Button route="/bookings">Booking</Button>
                <Button route="/account">Account</Button>
                <Button route="/cabins">Cabins</Button>
                <Button route="/settings">Settings</Button>
                <Button route="/user">Users</Button>
                <Button route="/error">Error</Button>
            </div>
        </div>
    )
}

export default Dashboard
