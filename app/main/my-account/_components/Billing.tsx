import LinkComponent from "./LinkComponent";

const Billing = () => {
    return (
        <div className='border-2 border-black/10 rounded-lg'>
            <div className='border-b-2 border-black/10 p-5'>
                <div className="text-brandpurple text-2xl font-semibold underline-offset-4 underline">Billing</div>
            </div>
            <div className="rounded-2xl p-5 flex flex-col gap-5">
                <LinkComponent label="Subscription Details" link="" variant="" />
                <LinkComponent label="Payment Method" link="" variant="" />
                <LinkComponent label="Billing History" link="" variant="" />
            </div>
        </div>
    );
}
export default Billing;