---
id: c7iqmdmfaq3xxza84puln1g
title: Class01📝
desc: 'notes on class 1 of missing semester'
updated: 1661806712681
created: 1661429540345
---

First page of class notes. Going to try a few different formats. Usually I'm a hand-written kinda person, but here i'll try something a bit more structured. This class seems like a decent starting point to play around.

## Terms

Shell, a text-only interface.

- shell
- prompt
- terminal

## Cheat Sheet + Time Stamps

TODO: reduce time stamps, make cheat sheet like the table on [tool.cli].

- 6:04 shell prompt   
- 6:32 curstomizing shell 
- 7:03 $date  
- 7:19 $echo  
- 7:29 $echo hello    
- 7:46 $echo "Hello world"    
- 8:41    
- 10:01 environment variable
    - TODO: add notes on env vars
- 10:17 $echo $PATH   
- 11:01 $ which echo  
- 12:30 relative path
- 12:50 $pwd (print working directory)    
- 13:24 cd /home (change my directory)    
- 13:58 dot   
- 15:03 ../../../../../
    - TODO: add notes on dot
- 16:20 $ls   
- 17:15 ~ tild    
- 17:36 - dash    
- $ cd -  
- 20:09 d means directory 
- 21:32 read, write, execute  
- 24:32 mv (rename, move)     
- 25:20 cp (copy from, to)    
- 25:50 rm (remove)       
- 26:15 rmdir, mkdir (remove directory, make directory)   
- 26:50 man (manual)  
- 27:55 Ctrl+L (clear shell)  
- 28:30 input and output  
- 29:30 $echo hello > hello.txt   
- 29:59 $cat hello.txt    
- 30:10 $cat < hello.txt  
- 30:43 $cat < hello.txt > hello2.txt 
- 31:15 $>>^C 
- 31:50 pipe  
- 32:20 tail  
- $tail -nl   
- $ls -l / | tail -nl 
- $ls -l / | tail -nl > ls.txt    
- 33:35 curl  
- curl --head --silent google.com     
- curl --head --silent google.com | grep -i content-length    
- curl --head --silent google.com | grep -i content-length | cut --delimetr = ' ' -f2 
- 36:39 $sudo (super user)    
- 38:02 $cat brightness
- $sudo echo 500 > brightness

## Conclusion/Thoughts

pretty straightforward, i've used bash, even if it's still uncomfortable
