import { HttpInterceptorFn } from '@angular/common/http';
import { AuthResponse } from '../models/authentication.model';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  // Define the requests you want to add the token to
  const tokenRequiredUrls = [
    '/api/booking',
    '/api/review'
  ];

  // Check if the request URL is in the list of URLs requiring the token
  const requiresToken = tokenRequiredUrls.some(url => req.url.includes(url));

  if (requiresToken) {
    const authToken = authService.loggedInUser.token;

    // Clone the request and add the auth token in the header
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });

    // Pass the cloned request instead of the original request to the next handler
    return next(authReq);
  }

  // If no token is required, pass the original request to the next handler
  return next(req);
};
