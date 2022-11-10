import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { 
    AccountCircleOutlined, 
    AdminPanelSettings, 
    CategoryOutlined, 
    ConfirmationNumberOutlined, 
    EscalatorWarningOutlined, 
    FemaleOutlined, 
    LoginOutlined, 
    MaleOutlined, 
    SearchOutlined, 
    VpnKeyOutlined }
from "@mui/icons-material"
import { useContext, useState } from "react"
import { AuthContext, UiContext } from "../../context"
import { useRouter } from "next/router"
import { DashboardOutlined } from '@mui/icons-material';

export const SideMenu = () => {
    const router = useRouter();
    const { toggleSideMenu, isMenuOpen } = useContext(UiContext);
    const {isLoggedIn, user, logout} = useContext(AuthContext);

    const [searchTerm, setSearchTerm] = useState('');

    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    }

    const onSearchTerm = () => {
        if ( searchTerm.trim().length === 0 ) return;

        navigateTo(`/search/${searchTerm}`);
    }

  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        onClose={ toggleSideMenu }
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm(e.target.value) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearchTerm }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                


                <ListItem onClick={() => navigateTo('/category/men')} button sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItem>

                <ListItem onClick={() => navigateTo('/category/women')} button sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItem>

                <ListItem onClick={() => navigateTo('/category/kid')} button sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItem>


                {
                    !isLoggedIn ? (
                        <ListItem button onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`)} >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                    )
                    : (
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button onClick={() => navigateTo('/orders/history')}>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
                            <ListItem button onClick={ logout }>
                                <ListItemIcon>
                                    <LoginOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItem>
                        </>
                    )
                }


                {/* Admin */}
                {
                    (user?.role === 'admin') && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>
                        
                            <ListItem 
                                button
                                onClick={ () => navigateTo('/admin/')} 
                            >
                                <ListItemIcon>
                                    <DashboardOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>

                            <ListItem button onClick={() => navigateTo('/admin/products')} >
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItem>

                            <ListItem button onClick={() => navigateTo('/admin/orders')} >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>
                        
                            <ListItem button onClick={() => navigateTo('/admin/users')}>
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}