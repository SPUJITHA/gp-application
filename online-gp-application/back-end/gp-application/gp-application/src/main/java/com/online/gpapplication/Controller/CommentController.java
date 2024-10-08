package com.online.gpapplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.gpapplication.Model.Comment;
import com.online.gpapplication.Model.CommentDTO;
import com.online.gpapplication.Service.CommentService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
	@RequestMapping("/api/comments")
	public class CommentController {

	    @Autowired
	    private CommentService commentService;

	    // Get comments for a request
	    @GetMapping("/getComment/{requestId}")
	    public ResponseEntity<List<Comment>> getCommentsByRequestId(@PathVariable Long requestId) {
	        List<Comment> comments = commentService.findCommentsByRequestId(requestId);
	        return ResponseEntity.ok(comments);
	    }

	    // Post a new comment
	    @PostMapping("/addComment/{requestId}")
	    public ResponseEntity<Comment> addComment(@PathVariable Long requestId, @RequestBody CommentDTO commentDTO) {
	        try {
	            Comment savedComment = commentService.addCommentToRequest(requestId, commentDTO);
	            return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }
	    }

	}



