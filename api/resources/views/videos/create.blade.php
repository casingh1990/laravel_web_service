@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
              <div>
                <form action="../videos" method="post" enctype="multipart/form-data">
                  <input type="hidden" name="req_type" value="html" />
                  <input type="hidden" name="user" value="{{$user_id}}" />
                  <input type="file" name="video" id="video" /><br />
                  <input type="submit" name="submit" value="submit" />
                </form>
              </div>
            </div>
        </div>
    </div>
</div>
@endsection
