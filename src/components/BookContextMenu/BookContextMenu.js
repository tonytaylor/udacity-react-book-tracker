import {useNavigate, useLocation} from "react-router-dom";

const BookContextMenu = ({ options, onShelfChange }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const onChange = (event) => {
        event.preventDefault();
        onShelfChange(event.target.value);
        (location.pathname === "/add") && navigate("/");
    }

    return (
        <div className="book-shelf-changer">
            <select value={"none"} onChange={onChange}>
                <option value="none" disabled>Move to...</option>
                {options.map((shelf) => {
                    return (
                        <option key={shelf.id} value={shelf.id}>{shelf.title}</option>
                    );
                })}
                <option value="none">None</option>
            </select>
        </div>
    );
};

export default BookContextMenu;