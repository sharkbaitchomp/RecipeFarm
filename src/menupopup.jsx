import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from 'react_router_dom';

export function Sidebar() {

    const { collapseSidebar } = useProSidebar();

    return (
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
            <Sidebar style={{height: "100vh" }}>
                <Menu
                    menuItemStyles={{
                        button: {
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={ () => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {"  "}
                        <h1>Menu</h1>
                    </MenuItem>
                    <p1>
                        How to:
                        1. "Lorem ipsum dolor sit amet,
                        2. consectetur adipiscing elit,
                        3. sed do eiusmod tempor
                        4. incididunt ut labore et dolore magna aliqua.
                        5. Ut enim ad minim veniam,
                    </p1>
                    <MenuItem component={<Link to="/details" />}> Details</MenuItem>
                    <MenuItem component={<Link to="/gallery" />}> Gallery</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
}

