// tslint:disable: variable-name
// tslint:disable: no-inferrable-types
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { UserService } from '../../services/';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  users: User[] = [];
  desde: number = 0;
  totalRegisters: number = 0;
  loading: boolean = true;

  constructor( public _userService: UserService, public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.loadUsers();

    this._modalUploadService.notification.subscribe( () => this.loadUsers() );
  }

  showModal( id: string ) {
    this._modalUploadService.showModal( 'usuarios', id );
  }

  loadUsers() {

    this.loading = true;

    this._userService.loadUsers( this.desde )
          .subscribe( (resp: any) => {

            if ( resp.usuarios.length <= 0 ) {
              this.desde -= 5;
              this.loadUsers();
              return;
             }

            this.totalRegisters = resp.total;
            this.users = resp.usuarios;
            this.loading = false;

          });

  }

  updateList( valor: number ) {

    const desde = this.desde + valor;

    if (desde >= this.totalRegisters ) { return; }
    if (desde < 0 ) { return; }

    this.desde += valor;
    this.loadUsers();
  }

  findUser( term: string ) {

    if (term.length <= 0) {
      this.loadUsers();
      return;
    }

    this.loading = true;

    this._userService.FindUsers( term ).subscribe( (users: User[]) => {

      this.users = users;
      this.loading = false;

    });
  }

  deleteUser( user: User ) {

    if ( user._id === this._userService.user._id) {
      swal.fire({ title: 'Error al borrar usuario', text: 'No se puede borrar a si mismo', icon: 'error' });
      return;
    }

    swal.fire({
      title: '¿Está seguro?',
      text: 'Está seguro de que quiere borrar a ' + user.nombre,
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true
    })
    .then(( isDeleted ) => {
      if (isDeleted.value) {
        this._userService.deleteUser( user._id )
          .subscribe( (deleted: boolean) => {
            console.log('%cUsuario borrado ', 'color: red', deleted );
            this.loadUsers();
          });
      }
    });

  }

  saveUser( user: User ) {
    this._userService.updateUser( user ).subscribe();
  }

}
