/// <reference path="../tabs/wilddog.d.ts" />
import 'wilddog';
import {Component} from '@angular/core';
import {NavController, ViewController, NavParams, ToastController} from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
    templateUrl: 'imageedit.html',
    styleUrls: ['/pages/contact/imageedit.scss']
})
export class imageEditPage {
    imagelist;
    imageurl;
    constructor(private navCtrl:NavController,private  params:NavParams, private toastCtrl:ToastController) {
        this.imagelist = [];
        this.loadImageList();
        this.imageurl = '';
    }

    loadImageList(){
        var imagehttp = 'http://airing.ursb.me/image/avatar/';
        for (var i = 0; i < 40; i++) {
            var image = imagehttp + i + '.png';
            this.imagelist[i] = image;
        }
    }

    imageUpload(){
        if(this.imageurl == '') {
            let imageToast = this.toastCtrl.create({
                message: "请选择图片",
                duration: 2000
            });
            imageToast.present();
        }else {
            var ref = new Wilddog("https://plant-book.wilddogio.com");
            var authData = ref.getAuth();
            if(authData){
                var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + authData.uid);
                userref.child('image').set(this.imageurl);
                this.navCtrl.pop();
            }else{
                let loginToast = this.toastCtrl.create({
                    message: "请先登录",
                    duration: 2000
                });
            }
        }
    }


        // this.http.get("https://sm.ms/api/upload?smfile=" + this.image)
        //     .subscribe(data => {
        //         console.log(data.json());
        //         console.log("200");
        //     }, error => {
        //         console.log("500");
        //     });

        // var userref = new Wilddog("https://plant-book.wilddogio.com/users/" + this.uid);
        // userref.child('image').set(this.image);
        // console.log(this.image);

}