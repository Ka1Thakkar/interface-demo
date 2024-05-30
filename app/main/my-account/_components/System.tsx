import LinkComponent from "./LinkComponent";

const System = () => {
    return (
        <div className='border-2 border-black/10 rounded-lg'>
            <div className='border-b-2 border-black/10 p-5'>
                <div className="text-brandpurple text-2xl font-semibold underline-offset-4 underline">System</div>
            </div>
            <div className="rounded-2xl p-5 flex flex-col gap-5">
                <LinkComponent label="Activity Log" link="" variant="" />
                <LinkComponent label="Notification Settings" link="" variant="" />
                <LinkComponent label="Account Deletion" link="/" variant="delete" />
            </div>
        </div>
    );
}

export default System;