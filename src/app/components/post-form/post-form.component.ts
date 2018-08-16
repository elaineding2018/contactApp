import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})

export class PostFormComponent implements OnInit {

  @Output() newPost: EventEmitter<Post> = new EventEmitter();
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter();
  @Input() currentPost: Post;
  @Input() isEdit: boolean;

 

  constructor(private postService: PostService) { }

  ngOnInit() {
    
  }

  addNewPost(){
       if(this.currentPost.firstName=='' || this.currentPost.lastName =='') {
         alert('Please input first name and last name');
       } else {
         this.currentPost.id = -1; //indicate this is a new record.
         this.currentPost.name = this.currentPost.firstName + ' ' + this.currentPost.lastName;
         this.currentPost.status = this.currentPost.isActive?'Active':'Inactive';
         this.postService.savePost(this.currentPost).subscribe(post => {
           this.newPost.emit(post);
         });
     
        } 
   }
  updateCurrentPost() {
    this.isEdit = false;
    if(this.currentPost.firstName=='' || this.currentPost.lastName =='') {
      alert('Please input first name and last name');
    } else {
      this.currentPost.name = this.currentPost.firstName + ' ' + this.currentPost.lastName;
      this.currentPost.status = this.currentPost.isActive?'Active':'Inactive';
     }
     
      this.updatedPost.emit(this.currentPost);
   /*  this.postService.updatePost(this.currentPost).subscribe(post => {
   
      this.isEdit = false;
      this.updatedPost.emit(post);
    }); */
  }
 

}
