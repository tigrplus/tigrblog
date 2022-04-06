from flask import (
    Flask, request, render_template, session, flash, redirect, url_for, jsonify
)

import string

from db import db_connection

app = Flask(__name__)
app.secret_key = 'THISISMYSECRETKEY'  # create the unique one for yourself

@app.route('/login', methods=['GET', 'POST'])
def login():
    """ function to show and process login page """
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = db_connection()
        cur = conn.cursor()
        sql = """
            SELECT username
            FROM users
            WHERE username = '%s' AND password = '%s'
        """ % (username, password)
        cur.execute(sql)
        user = cur.fetchone()

        error = ''
        if user is None:
            error = 'Wrong credentials. No user found'
        else:
            session.clear()
            session['username'] = user[0]
            return redirect(url_for('index'))

        flash(error)
        cur.close()
        conn.close()

    return render_template('login.html')

@app.route('/register', methods=['GET','POST'])
def register():
    if request.method == "POST":
        data = request.get_json() or {}
        # check if username and password exist :
        if data.get('username') and data.get('name') and data.get('password'):
            username = data.get('username', '')
            name = data.get('name', '')
            password = data.get('password', '')

            # strip() is to remove excessive whitespaces before saving
            username = username.strip()
            name = name.strip()
            password = password.strip()

            conn = db_connection()
            cur = conn.cursor()
            # insert with the user_id

            #AAAAAAAAAAAAAAAAAAAAAAAA COPAS DARI SINI AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

            #unique username
            if request.method == 'POST':
                username = request.form['username']
                password = request.form['password']

                conn = db_connection()
                cur = conn.cursor()
                sql = """
                    SELECT username
                    FROM users
                    WHERE username = '%s' AND password = '%s'
                """ % (username, password)
                cur.execute(sql)
                user = cur.fetchone()

                error = ''
                if user is None:
                    session.clear()
                    session['username'] = user[0]
                    return redirect(url_for('index'))
                else:
                    error = 'Username already exist'

                flash(error)
                cur.close()
                conn.close()

            return render_template('register.html')


            #AAAAAAAAAAAAAAAAAAAAAAAA COPAS SAMPE SINI AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

            sql = """
                INSERT INTO users (username, name,  password) VALUES ('%s', '%s', '%s')
            """ % (username, name, password)
            cur.execute(sql)
            conn.commit()  # commit to make sure changes are saved
            cur.close()
            conn.close()
            # an example with redirect
            return jsonify({'status': 200, 'message': 'Success'})

        # else will be error
        return jsonify({'status': 500, 'message': 'No Data submitted'})

    return render_template('register.html')

@app.route('/logout')
def logout():
    """ function to do logout """
    session.clear()  # clear all sessions
    return redirect(url_for('login'))


@app.route('/')
def index():
    conn = db_connection()
    cur = conn.cursor()
    sql = """
        SELECT art.id, art.title, art.body, art.user_name
        FROM articles art
        JOIN users usr ON usr.username = art.user_name
        ORDER BY art.title
    """
    cur.execute(sql)
    # [(1, "Article Title 1", "Art 1 content"), (2, "Title2", "Content 2"), ...]
    articles = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', articles=articles)

@app.route('/<username>', methods=['GET', 'POST'])
def userpage(username):
    # check if user is logged in as $username
    # open db connection
    conn = db_connection()
    cur = conn.cursor()
    # sql to select username from database
    sql = """
            SELECT art.id, art.title, art.body, art.user_name 
            FROM articles art
            WHERE art.user_name = '%s'
            ORDER BY art.title
    """ % username
    cur.execute(sql)
    userposts = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('accountpage.html', userposts=userposts)

@app.route('/article/create', methods=['GET', 'POST'])
def create():
    # check if user is logged in
    if not session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        data = request.get_json() or {}
        # check existence of title and body
        if data.get('title') and data.get('body'):
            title = data.get('title', '')
            body = data.get('body', '')
            user_name = str(session.get('username'))

            # strip() is to remove excessive whitespaces before saving
            title = title.strip()
            body = body.strip()

            conn = db_connection()
            cur = conn.cursor()
            # insert with the user_id
            sql = """
                INSERT INTO articles (title, body, user_name) VALUES ('%s', '%s', '%s')
            """ % (title, body, user_name)
            cur.execute(sql)
            conn.commit()  # commit to make sure changes are saved
            cur.close()
            conn.close()
            # an example with redirect
            return jsonify({'status': 200, 'message': 'Success', 'redirect': '/'})

        # else will be error
        return jsonify({'status': 500, 'message': 'No Data submitted'})

    return render_template('create.html')


@app.route('/<username>/<int:article_id>', methods=['GET'])
def read(username, article_id):
    # find the article with id = article_id, return not found page if error
    conn = db_connection()
    cur = conn.cursor()
    sql = """
        select art.title, art.body, art.user_name
        from articles art
        where art.user_name = '%s' and art.id = %d
    """ % (username, article_id)
    cur.execute(sql)
    article = cur.fetchone()
    cur.close()
    conn.close()
    return render_template('detail.html', article=article)


@app.route('/<username>/edit/<int:article_id>', methods=['GET', 'POST'])
def edit(username, article_id):
    # check if user is logged in
    if not session:
        return redirect(url_for('login'))
    
    else :
        if username == session['username']:
            if request.method == 'POST':
                conn = db_connection()
                cur = conn.cursor()
                title = request.form['title']
                body = request.form['body']
                title = title.strip()
                body = body.strip()

                sql_params = (title, body, article_id)

                sql = "UPDATE articles SET title = '%s', body = '%s' WHERE id = %s" % sql_params
                print(sql)
                cur.execute(sql)
                cur.close()
                conn.commit()
                conn.close()
                # use redirect to go to certain url. url_for function accepts the
                # function name of the URL which is function index() in this case
                return redirect(url_for('index'))
        else:
            return redirect(url_for('index'))

    # find the record first                                                             
    conn = db_connection()                                                              
    cur = conn.cursor()                                                                 
    sql = 'SELECT id, title, body, user_name FROM articles WHERE id = %s' % article_id    
    cur.execute(sql)                                                                    
    article = cur.fetchone()                                                            
    cur.close()                                                                         
    conn.close()                                                                        

    return render_template('edit.html', article=article)


@app.route('/delete/<int:article_id>', methods=['GET', 'POST'])
def delete(article_id):
    # check if user is logged in
    if not session:
        return redirect(url_for('login'))

    conn = db_connection()
    cur = conn.cursor()
    sql = """
          DELETE 
          FROM articles art 
          WHERE art.id = %d
    """ % article_id
    cur.execute(sql)
    cur.close()
    conn.commit()
    conn.close()
    return jsonify({'status': 200, 'redirect': '/'})

