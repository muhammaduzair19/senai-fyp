import { Link } from "react-router-dom";

const Breadcrumb = ({ pageName }) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between items-center">
            <h2 className="text-2xl lg:text-4xl gradient-title font-extrabold pb-2">
                {pageName}
            </h2>

            <nav className="pb-2">
                <ul className="flex items-center gap-2">
                    <li>
                        <Link className="font-medium" to="/">
                            Dashboard /
                        </Link>
                    </li>
                    <li className="font-medium text-green-600 dark:text-green-800">{pageName}</li>
                </ul>
            </nav>
        </div>
    );
};

export default Breadcrumb;
