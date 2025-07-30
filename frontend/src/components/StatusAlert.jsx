export default function StatusAlert({ message }) {
    if (!message) return null;
    return <div className="alert alert-info text-center">{message}</div>;
  }