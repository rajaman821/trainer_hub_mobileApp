import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { UserRoles } from '../user-roles.enum';
export class CommonCode {
    appPages: { roles: UserRoles; title: string; url?: string; icon: string; }[];

    constructor(
        public storage: Storage,
        public route: Router,
        public navCtrl: NavController,
        public loadCtrl : LoadingController
    ) { }

    public navigationMethod(value) {
        debugger;
        switch (value) {
            case UserRoles.Nouser:
                this.navCtrl.navigateRoot('/login');
                break;
            case UserRoles.Teacher:
                this.navCtrl.navigateRoot('/teacherloggedin');
                break;
            case UserRoles.Student:
                this.navCtrl.navigateRoot('/loggedinuser');
                break;

            default:
                break;
        }
    }

    public setSideMenuRoutesMethod(value) {
        debugger;
        this.initialiseRoutes();
        let user_BasedRoute_From_Enum = value
        this.appPages = this.appPages.filter(element => element.roles == user_BasedRoute_From_Enum);
        let common_route = {
            roles: 0,
            title: 'Logout',
            icon: 'log-out'
        }
        this.appPages.push(common_route);
        return this.appPages;
    }


    public async logOut() {

        let loading = await this.loadCtrl.create({
            message: 'Please wait...',
            spinner: "crescent"
        });
        loading.present();

        setTimeout(() => {
            this.storage.clear();
            this.navCtrl.navigateRoot('/login');
            loading.dismiss();
        }, 1000);
    }

    protected initialiseRoutes() {
        this.appPages = [
            {
                roles: UserRoles.Student_Routes,
                title: 'Home',
                url: '/loggedinuser',
                icon: 'home'
            },
            {
                roles: UserRoles.Student_Routes,
                title: 'Profile',
                url: '/profile',
                icon: 'list'
            },
            {
                roles: UserRoles.Student_Routes,
                title: 'Find a Tutor',
                url: '/findtutor',
                icon: 'list'
            },
            {
                roles: UserRoles.Student_Routes,
                title: 'History',
                url: '/historytickets',
                icon: 'list'
            },
            {
                roles: UserRoles.Teacher_Routes,
                title: 'Home',
                url: '/teacherloggedin',
                icon: 'home'
            },
            {
                roles: UserRoles.Teacher_Routes,
                title: 'Profile',
                url: '/teacherprofile',
                icon: 'list'
            }
        ];
    }
}
