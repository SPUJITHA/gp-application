package com.online.gpapplication.Service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.online.gpapplication.Model.Comment;
import com.online.gpapplication.Model.CommentDTO;
import com.online.gpapplication.Model.TechnicalRequest;
import com.online.gpapplication.Model.User;
import com.online.gpapplication.Repository.CommentRepository;
import com.online.gpapplication.Repository.TechnicalRequestRepository;
import com.online.gpapplication.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private TechnicalRequestRepository technicalRequestRepository;
    
    @Autowired
    TechnicalService technicalService;
    
    @Autowired
    private UserRepository userRepository;

    // Fetch all comments for a given requestId
    public List<Comment> findCommentsByRequestId(Long requestId) {
        return commentRepository.findByTechnicalRequestId(requestId);
    }

    // Add a new comment to a specific request
    public Comment addCommentToRequest(Long requestId, CommentDTO commentDTO) {
        Optional<TechnicalRequest> technicalRequest = technicalService.getTechnicalRequestByEmailId(requestId);
        User user = userRepository.findByEmailId(commentDTO.getAuthorEmail());
        Comment comment = new Comment();
        comment.setAuthor(user);
        comment.setComment(commentDTO.getComment());
        
        if (technicalRequest == null) {
            throw new RuntimeException("Request not found!");
        }
        comment.setTechnicalRequest(technicalRequest.get());
        return commentRepository.save(comment);
    }
    
    }

