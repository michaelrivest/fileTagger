
## About 
File Tagger provides two command line utilites: ftag for adding and removing file tags, and fsearch for searching tagged files. Fsearch also offers an exec mode for quick access to your files. 


### Add File Tagger to PATH: 
On Linux: 
```
echo 'export PATH=$PATH:/path/to/fileTagger' >> ~/.bashrc && source ~/.bashrc
```

## ftag Usage: 

```
ftag ./js -t js javascript
```
The first argument is a list of files or folders - if not specified, ftag will read this arguement from stdin. If a folder is specified, tags will be applied recursively.  The "-t" option will add the list of tags following it to the file. 

The *-d* command will delete tags: 
```
ftag ./js -d jvaascript
```


## fsearch Usage: 
```
fsearch javascript node
```
The first argument is a list of tags to search - fsearch will display results that match every tag specified. This is the same as specifying *-a* followed by your list of tags. 

To display results matching any of the tags listed, use the "-o" option: 
```
fsearch -o javascript node
```

### Exec Mode: 
Specify exec mode using *-x*. Exec mode will display your results along with a number - Enter this number to open the corresponding file using the program specified in your config.json, or type exit to quit.  

### Other options: 

* -i: Display additional info for results, such as file tags and category ` fsearch js -i `

* -f: Displays the full path for results instead of relative paths ` fsearch js -f `

* -l: Limits results to the number specified ` fsearch -l 5 `

* -n: Search by file name `fsearch -n "Elegant Javascript" `

* -c: Search by category. Categories are determined by file extension, based on the fileTypes property in config.json. `fsearch -c document`


## Config: 
### Default Programs: 
The *defaultPrograms* property is an array of programs fsearch will use to open files in exec mode. It will use the last program in the array which contains criteria matching the specified file to open, Ex: 

```
{
            "command": "mupdf -r 150", 
            "opens": {"extension": ["pdf", "epub"] },
            "options": {"fallback":false, "editor": false }
        }
```

Will be used to open any file with a .pdf or .epub extension. Other Criteria include category, and file name. Ex: 

```
{
    "command": "yourCustomCommand", 
    "opens": { 
                "name": ["fileOpenedByCustomCommand" ],
                "category": ["video"]
            },
                "options": {"fallback":false, "editor": false}
}
```

Will match any file with the category "video", or with the filename fileOpenedByCustomCommand. 
Setting fallback to true will cause the program to match regardless of criteria if no other program matches. Setting editor to true is used to make command line text editors such as vim open and close correctly.  

### File Types: 
The *fileTypes* property maps category names to an array of file extensions. Files are categorized automatically based on their extension for quick searching with the *-c* option. To change which extensions are assigned to a category or add new ones, just add the file extension in lower case with no "." to the desired category. You can also change category names and add new ones.

