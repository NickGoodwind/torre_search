import React, {Component} from "react";
import SearchForm from "./SearchForm";
import IndividualsTable from "./IndividualsTable";
import HistoryTable from "./HistoryTable";

class Page extends Component {

    render() {
        const page = this.props.page;

        let pageClass = "page-index flexy-col";
        let pageTitle = "My amazing contact finder in Torre.ai";
        let pageContent = <SearchForm/>;

        if (page === "search") {
            pageClass = "page-results flexy-col start";
            pageTitle = "Search Results";
            pageContent = <IndividualsTable/>;
        } else if (page === "history") {
            pageClass = "page-history flexy-col start";
            pageTitle = "Search History";
            pageContent = <HistoryTable/>;
        }

        return (
            <div className={pageClass}>
                <h1 className="title">{pageTitle}</h1>
                <div id="page-container" className="flexy-row">
                    {pageContent}
                </div>
            </div>
        );
    }
}

export default Page