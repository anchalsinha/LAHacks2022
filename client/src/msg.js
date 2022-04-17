const Messenger = ({ message }) => (
    <div role="region" aria-live="polite" className="visually-hidden">
        {message}
    </div>
);

export default Messenger